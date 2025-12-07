-- API Usage Tracking Tables

-- Store every API call for cost tracking
CREATE TABLE IF NOT EXISTS api_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  model VARCHAR(100) NOT NULL,
  input_tokens INTEGER NOT NULL,
  output_tokens INTEGER NOT NULL,
  cost DECIMAL(10, 6) NOT NULL, -- Store in dollars with 6 decimal precision
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  request_id VARCHAR(100) UNIQUE NOT NULL,
  metadata JSONB -- Store additional info (prompt preview, feature used, etc.)
);

-- User budget limits
CREATE TABLE IF NOT EXISTS user_budget_limits (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_max DECIMAL(10, 2) DEFAULT 10.00,
  monthly_max DECIMAL(10, 2) DEFAULT 50.00,
  per_request_max DECIMAL(10, 2) DEFAULT 1.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_api_usage_user_time ON api_usage_logs(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_api_usage_user_date ON api_usage_logs(user_id, DATE(timestamp));
CREATE INDEX IF NOT EXISTS idx_api_usage_model ON api_usage_logs(model);

-- Function to get daily spending
CREATE OR REPLACE FUNCTION get_daily_spending(uid UUID, day DATE)
RETURNS DECIMAL(10, 6) AS $$
  SELECT COALESCE(SUM(cost), 0)
  FROM api_usage_logs
  WHERE user_id = uid 
    AND DATE(timestamp) = day;
$$ LANGUAGE SQL STABLE;

-- Function to get monthly spending
CREATE OR REPLACE FUNCTION get_monthly_spending(uid UUID, month DATE)
RETURNS DECIMAL(10, 6) AS $$
  SELECT COALESCE(SUM(cost), 0)
  FROM api_usage_logs
  WHERE user_id = uid 
    AND DATE_TRUNC('month', timestamp) = DATE_TRUNC('month', month);
$$ LANGUAGE SQL STABLE;

-- View for user spending summary
CREATE OR REPLACE VIEW user_spending_summary AS
SELECT 
  user_id,
  COUNT(*) as total_requests,
  SUM(cost) as total_cost,
  SUM(input_tokens) as total_input_tokens,
  SUM(output_tokens) as total_output_tokens,
  AVG(cost) as avg_cost_per_request,
  MAX(timestamp) as last_request_time
FROM api_usage_logs
GROUP BY user_id;

-- Trigger to update user_budget_limits updated_at
CREATE OR REPLACE FUNCTION update_budget_limits_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER budget_limits_updated
BEFORE UPDATE ON user_budget_limits
FOR EACH ROW
EXECUTE FUNCTION update_budget_limits_timestamp();



