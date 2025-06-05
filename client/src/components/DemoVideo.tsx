
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const DemoVideo: React.FC = () => {
  const navigate = useNavigate();

  const openDemo = () => {
    navigate('/demo');
  };

  return (
    <Button 
      onClick={openDemo}
      className="bg-primary text-white hover:bg-primary/90 font-medium px-6 py-2"
    >
      <i className="fas fa-play-circle mr-2"></i>
      Start with Demo
    </Button>
  );
};

export default DemoVideo;
