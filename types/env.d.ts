// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PRIVATE_SUPABASE_SERVICE_KEY: string;
    LUCY_DEFAULT_MODEL?: string;
    ANTHROPIC_API_KEY?: string;
    OPENAI_API_KEY?: string;
  }
}
