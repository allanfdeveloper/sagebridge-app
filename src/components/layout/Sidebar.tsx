
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  FileText, 
  ShoppingCart, 
  Package, 
  PieChart, 
  BarChart, 
  Settings, 
  Users, 
  CreditCard,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Sales', icon: ShoppingCart, path: '/sales' },
    { name: 'Purchases', icon: Package, path: '/purchases' },
    { name: 'Customers', icon: Users, path: '/customers' },
    { name: 'Banking', icon: CreditCard, path: '/banking' },
    { name: 'Reports', icon: PieChart, path: '/reports' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  // Sidebar animation variants
  const sidebarVariants = {
    expanded: { width: '240px', transition: { duration: 0.3, ease: [0.61, 1, 0.88, 1] } },
    collapsed: { width: '72px', transition: { duration: 0.3, ease: [0.61, 1, 0.88, 1] } }
  };

  return (
    <motion.aside
      className="bg-sidebar h-screen z-20 border-r border-sidebar-border shadow-nav"
      variants={sidebarVariants}
      initial={collapsed ? 'collapsed' : 'expanded'}
      animate={collapsed ? 'collapsed' : 'expanded'}
    >
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border/20">
        {!collapsed ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
              <span className="text-sage-blue font-bold text-xl">C</span>
            </div>
            <span className="font-semibold text-white text-lg">Contas</span>
          </motion.div>
        ) : (
          <div className="w-8 h-8 rounded-md bg-white mx-auto flex items-center justify-center">
            <span className="text-sage-blue font-bold text-xl">C</span>
          </div>
        )}
      </div>
      
      <nav className="mt-6 px-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.name}>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center h-10 px-3 rounded-md transition-all duration-300 group",
                    isActive 
                      ? "bg-sidebar-accent text-white" 
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-white"
                  )}
                >
                  <item.icon 
                    className={cn(
                      "h-5 w-5",
                      collapsed ? "mx-auto" : "mr-3"
                    )} 
                  />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-8 left-0 w-full px-2">
        <div className={cn(
          "space-y-1",
          collapsed ? "px-2" : "px-3"
        )}>
          <Link to="/help" className={cn(
            "flex items-center h-10 rounded-md transition-all duration-200",
            "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white",
            collapsed ? "justify-center px-0" : "px-3"
          )}>
            <HelpCircle className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
            {!collapsed && <span>Help & Support</span>}
          </Link>
          
          <Link to="/logout" className={cn(
            "flex items-center h-10 rounded-md transition-all duration-200",
            "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white",
            collapsed ? "justify-center px-0" : "px-3"
          )}>
            <LogOut className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
            {!collapsed && <span>Logout</span>}
          </Link>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
