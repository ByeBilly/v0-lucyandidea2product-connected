"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { 
  Github, 
  Mail, 
  MessageCircle,
  Music2,
  Video,
  Briefcase,
  Code2,
  GitBranch,
  Slack,
  Chrome,
  Twitter,
  Facebook,
  Linkedin,
  Send
} from "lucide-react"

interface OAuthProvider {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  enabled: boolean
  popular?: boolean
}

const OAUTH_PROVIDERS: OAuthProvider[] = [
  // Most Popular (Top Row)
  { id: 'google', name: 'Google', icon: <Chrome className="w-5 h-5" />, color: 'from-[#4285F4] to-[#34A853]', enabled: true, popular: true },
  { id: 'github', name: 'GitHub', icon: <Github className="w-5 h-5" />, color: 'from-gray-800 to-gray-600', enabled: true, popular: true },
  { id: 'facebook', name: 'Facebook', icon: <Facebook className="w-5 h-5" />, color: 'from-[#1877F2] to-[#0C63D4]', enabled: false, popular: true },
  { id: 'discord', name: 'Discord', icon: <MessageCircle className="w-5 h-5" />, color: 'from-[#5865F2] to-[#4752C4]', enabled: false, popular: true },
  
  // Social & Professional
  { id: 'twitter', name: 'Twitter/X', icon: <Twitter className="w-5 h-5" />, color: 'from-black to-gray-700', enabled: false },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, color: 'from-[#0077B5] to-[#00669C]', enabled: false },
  { id: 'slack', name: 'Slack', icon: <Slack className="w-5 h-5" />, color: 'from-[#4A154B] to-[#36123A]', enabled: false },
  
  // Developer Platforms
  { id: 'gitlab', name: 'GitLab', icon: <GitBranch className="w-5 h-5" />, color: 'from-[#FC6D26] to-[#E24329]', enabled: false },
  { id: 'bitbucket', name: 'Bitbucket', icon: <Code2 className="w-5 h-5" />, color: 'from-[#0052CC] to-[#0747A6]', enabled: false },
  { id: 'notion', name: 'Notion', icon: <Mail className="w-5 h-5" />, color: 'from-black to-gray-700', enabled: false },
  
  // Entertainment & Creative
  { id: 'spotify', name: 'Spotify', icon: <Music2 className="w-5 h-5" />, color: 'from-[#1DB954] to-[#1AA34A]', enabled: false },
  { id: 'twitch', name: 'Twitch', icon: <Video className="w-5 h-5" />, color: 'from-[#9146FF] to-[#772CE8]', enabled: false },
  
  // Enterprise & Productivity
  { id: 'azure', name: 'Microsoft', icon: <Briefcase className="w-5 h-5" />, color: 'from-[#0078D4] to-[#106EBE]', enabled: false },
  { id: 'workos', name: 'WorkOS', icon: <Briefcase className="w-5 h-5" />, color: 'from-indigo-600 to-indigo-800', enabled: false },
  { id: 'zoom', name: 'Zoom', icon: <Video className="w-5 h-5" />, color: 'from-[#2D8CFF] to-[#0B5CFF]', enabled: false },
  
  // Communication
  { id: 'telegram', name: 'Telegram', icon: <Send className="w-5 h-5" />, color: 'from-[#229ED9] to-[#0088CC]', enabled: false }, // Coming soon
]

interface OAuthProvidersGridProps {
  mode?: 'signin' | 'signup'
  onLoading?: (loading: boolean) => void
}

export function OAuthProvidersGrid({ mode = 'signin', onLoading }: OAuthProvidersGridProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleOAuthSignIn = async (providerId: string) => {
    try {
      setLoadingProvider(providerId)
      onLoading?.(true)

      const redirectTo = `${window.location.origin}/auto-login?type=social-${providerId}`
      const client = createClient()
      
      const { error } = await client.auth.signInWithOAuth({
        provider: providerId as any,
        options: { redirectTo },
      })

      if (error) {
        console.error(`OAuth error (${providerId}):`, error)
        toast.error(`Failed to ${mode === 'signin' ? 'sign in' : 'sign up'} with ${providerId}`)
      }
    } catch (error) {
      console.error(`OAuth error (${providerId}):`, error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoadingProvider(null)
      onLoading?.(false)
    }
  }

  const popularProviders = OAUTH_PROVIDERS.filter(p => p.popular && p.enabled)
  const otherProviders = OAUTH_PROVIDERS.filter(p => !p.popular && p.enabled)
  const comingSoon = OAUTH_PROVIDERS.filter(p => !p.enabled)

  return (
    <div className="space-y-6">
      {/* Popular Options - Large Buttons */}
      {popularProviders.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">Popular Options</p>
          <div className="grid grid-cols-2 gap-3">
            {popularProviders.map((provider) => (
              <Button
                key={provider.id}
                type="button"
                variant="outline"
                size="lg"
                onClick={() => handleOAuthSignIn(provider.id)}
                disabled={loadingProvider !== null}
                className={`relative h-12 overflow-hidden border-2 transition-all hover:scale-105 ${
                  loadingProvider === provider.id ? 'animate-pulse' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${provider.color} opacity-10`} />
                <div className="relative flex items-center gap-2">
                  {provider.icon}
                  <span className="font-semibold">{provider.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* All Other Options - Compact Grid */}
      {otherProviders.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">More Options</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {otherProviders.map((provider) => (
              <Button
                key={provider.id}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleOAuthSignIn(provider.id)}
                disabled={loadingProvider !== null}
                className={`relative overflow-hidden transition-all hover:scale-105 ${
                  loadingProvider === provider.id ? 'animate-pulse' : ''
                }`}
                title={`${mode === 'signin' ? 'Sign in' : 'Sign up'} with ${provider.name}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${provider.color} opacity-10`} />
                <div className="relative flex items-center gap-1.5">
                  {provider.icon}
                  <span className="text-xs font-medium hidden sm:inline">{provider.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Coming Soon */}
      {comingSoon.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground text-center italic">
            Coming Soon: {comingSoon.map(p => p.name).join(', ')}
          </p>
        </div>
      )}

      {/* Marketing Message */}
      <div className="pt-4 text-center">
        <p className="text-xs text-muted-foreground">
          🎯 <span className="font-semibold">The most OAuth options anywhere.</span>
          <br />
          Sign in your way. Total choice.
        </p>
      </div>
    </div>
  )
}

