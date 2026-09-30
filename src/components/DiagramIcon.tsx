import React from 'react';
import {
  TrendingUp,
  Cpu,
  Cloud,
  Globe,
  Bot,
  CloudUpload,
  BarChart3,
  Home,
  MessageCircle,
  Rocket,
  GraduationCap,
  Briefcase,
  Users,
  Clock,
  Cog,
  BookOpen,
  Shield,
  AlertTriangle,
  Brain,
  Laptop,
  RefreshCw,
  Heart,
  MessageSquare,
  Handshake,
  Target,
  Sparkles,
} from 'lucide-react';

interface DiagramIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DiagramIcon: React.FC<DiagramIconProps> = ({ name, className = "w-5 h-5", size = 20 }) => {
  switch (name) {
    case 'trending-up':
      return <TrendingUp className={className} size={size} />;
    case 'cpu':
      return (
        <div className="relative flex items-center justify-center font-bold text-[9px] font-mono">
          <Cpu className={className} size={size} />
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-extrabold text-blue-900 leading-none">
            AI
          </span>
        </div>
      );
    case 'cloud':
      return <Cloud className={className} size={size} />;
    case 'globe':
    case 'globe-2':
      return <Globe className={className} size={size} />;
    case 'bot':
      return <Bot className={className} size={size} />;
    case 'cloud-upload':
      return <CloudUpload className={className} size={size} />;
    case 'bar-chart':
      return <BarChart3 className={className} size={size} />;
    case 'home':
      return <Home className={className} size={size} />;
    case 'message-circle':
      return <MessageCircle className={className} size={size} />;
    case 'rocket':
      return <Rocket className={className} size={size} />;
    case 'graduation-cap':
      return <GraduationCap className={className} size={size} />;
    case 'briefcase':
      return <Briefcase className={className} size={size} />;
    case 'users':
    case 'users-group':
      return <Users className={className} size={size} />;
    case 'clock':
      return <Clock className={className} size={size} />;
    case 'clock-alert':
      return (
        <div className="relative">
          <Clock className={className} size={size} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full flex items-center justify-center text-[7px] text-white font-bold">!</span>
        </div>
      );
    case 'cog':
      return <Cog className={className} size={size} />;
    case 'book-open':
    case 'book':
      return <BookOpen className={className} size={size} />;
    case 'shield':
      return <Shield className={className} size={size} />;
    case 'alert-triangle':
      return <AlertTriangle className={className} size={size} />;
    case 'brain':
      return <Brain className={className} size={size} />;
    case 'brain-circuit':
      return <Brain className={className} size={size} />;
    case 'laptop':
      return <Laptop className={className} size={size} />;
    case 'refresh-cw':
    case 'sync-circle':
      return <RefreshCw className={className} size={size} />;
    case 'heart':
    case 'heart-circle':
      return <Heart className={className} size={size} fill="currentColor" />;
    case 'message-square':
      return <MessageSquare className={className} size={size} />;
    case 'lotus':
      // Calm flower/meditation symbol
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 4c-1.5 3-4 6-4 9a4 4 0 0 0 8 0c0-3-2.5-6-4-9z" />
          <path d="M6 14c-1.5-1-3-3-3-5 2.5 0 5 1.5 6 4" />
          <path d="M18 14c1.5-1 3-3 3-5-2.5 0-5 1.5-6 4" />
          <path d="M4 17c3 2 6 2 8 2s5 0 8-2" />
        </svg>
      );
    case 'handshake':
      return <Handshake className={className} size={size} />;
    case 'target':
      return <Target className={className} size={size} />;
    default:
      return <Sparkles className={className} size={size} />;
  }
};
