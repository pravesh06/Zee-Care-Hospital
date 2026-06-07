import React from "react";
import {
  Heart,
  Brain,
  Activity,
  Baby,
  Shield,
  Eye,
  Volume2,
  Scissors,
  Smile,
  Tv,
  Cpu,
  Thermometer,
  Boxes,
  Ambulance,
  FolderHeart,
  Award,
  ShieldAlert,
  User,
  Timer,
  FolderCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Star,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Heart,
  Brain,
  Activity,
  Baby,
  Shield,
  Eye,
  Volume2,
  Scissors,
  Smile,
  Tv,
  Cpu,
  Thermometer,
  Boxes,
  Ambulance,
  FolderHeart,
  Award,
  ShieldAlert,
  User,
  Timer,
  FolderCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Star,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
};

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className = "", size = 24 }: DynamicIconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    // Fallback to standard HelpCircle/Activity-like icon if not found
    return <Activity className={className} size={size} />;
  }
  return <IconComponent className={className} size={size} />;
}
