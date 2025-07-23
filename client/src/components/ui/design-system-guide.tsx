import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Type, 
  Layout, 
  Zap, 
  Check, 
  Copy,
  Eye,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

export const DesignSystemGuide: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const ColorPalette = () => {
    const colors = [
      { name: 'Primary Blue', value: '#3b82f6', var: '--iterativ-blue-500', usage: 'CTAs, Links, Accents' },
      { name: 'Primary Blue Dark', value: '#1e3a8a', var: '--iterativ-blue-900', usage: 'Headers, Focus States' },
      { name: 'Primary Blue Light', value: '#eff6ff', var: '--iterativ-blue-50', usage: 'Backgrounds, Subtle Accents' },
      { name: 'Success Green', value: '#10b981', var: '--success', usage: 'Success States, Confirmations' },
      { name: 'Warning Orange', value: '#f59e0b', var: '--warning', usage: 'Warnings, Alerts' },
      { name: 'Error Red', value: '#ef4444', var: '--error', usage: 'Errors, Destructive Actions' },
      { name: 'Info Cyan', value: '#06b6d4', var: '--info', usage: 'Information, Tips' },
      { name: 'Neutral Gray', value: '#6b7280', var: '--neutral-500', usage: 'Text, Borders, Backgrounds' },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {colors.map((color) => (
          <Card key={color.name} className="overflow-hidden">
            <div 
              className="h-20 w-full"
              style={{ backgroundColor: color.value }}
            />
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-2">{color.name}</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">{color.value}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(color.value, color.name)}
                    className="h-6 w-6 p-0"
                  >
                    {copiedItem === color.name ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                <code className="text-xs text-gray-600 block">{color.var}</code>
                <p className="text-xs text-gray-500">{color.usage}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const TypographySystem = () => {
    const typography = [
      { name: 'Display Large', class: 'text-6xl font-bold', usage: 'Hero Headlines', element: 'H1' },
      { name: 'Display', class: 'text-5xl font-bold', usage: 'Page Headlines', element: 'H1' },
      { name: 'Headline Large', class: 'text-4xl font-semibold', usage: 'Section Headers', element: 'H2' },
      { name: 'Headline', class: 'text-3xl font-semibold', usage: 'Subsection Headers', element: 'H2' },
      { name: 'Title Large', class: 'text-2xl font-semibold', usage: 'Card Titles', element: 'H3' },
      { name: 'Title', class: 'text-xl font-semibold', usage: 'Component Titles', element: 'H3' },
      { name: 'Body Large', class: 'text-lg', usage: 'Important Body Text', element: 'P' },
      { name: 'Body', class: 'text-base', usage: 'Regular Body Text', element: 'P' },
      { name: 'Body Small', class: 'text-sm', usage: 'Secondary Text', element: 'P' },
      { name: 'Caption', class: 'text-xs', usage: 'Captions, Labels', element: 'SPAN' },
    ];

    return (
      <div className="space-y-6">
        {typography.map((type) => (
          <div key={type.name} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className={type.class}>
                The quick brown fox jumps over the lazy dog
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="outline">{type.element}</Badge>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">{type.class}</code>
                <span className="text-xs text-gray-500">{type.usage}</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(type.class, type.name)}
              className="ml-4"
            >
              {copiedItem === type.name ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
      </div>
    );
  };

  const ComponentPatterns = () => {
    const patterns = [
      {
        name: 'Primary Button',
        component: <Button size="lg" className="min-w-[140px]">Primary Action</Button>,
        code: `<Button size="lg" className="min-w-[140px]">Primary Action</Button>`,
        usage: 'Main CTAs, form submissions'
      },
      {
        name: 'Secondary Button',
        component: <Button variant="outline" size="lg" className="min-w-[140px]">Secondary Action</Button>,
        code: `<Button variant="outline" size="lg" className="min-w-[140px]">Secondary Action</Button>`,
        usage: 'Alternative actions, cancel buttons'
      },
      {
        name: 'Ghost Button',
        component: <Button variant="ghost" size="lg">Ghost Action</Button>,
        code: `<Button variant="ghost" size="lg">Ghost Action</Button>`,
        usage: 'Subtle actions, navigation'
      },
      {
        name: 'Gradient Button',
        component: <Button variant="gradient" size="lg">Gradient Action</Button>,
        code: `<Button variant="gradient" size="lg">Gradient Action</Button>`,
        usage: 'Premium features, special CTAs'
      },
      {
        name: 'Feature Card',
        component: (
          <Card className="w-72">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                Feature Title
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Feature description that explains the benefit to users.</p>
            </CardContent>
          </Card>
        ),
        code: `<Card className="w-72">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-blue-500" />
      Feature Title
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-gray-600">Description...</p>
  </CardContent>
</Card>`,
        usage: 'Feature highlights, benefit showcases'
      },
      {
        name: 'Status Badge',
        component: (
          <div className="flex gap-2">
            <Badge variant="default">Active</Badge>
            <Badge variant="secondary">Pending</Badge>
            <Badge variant="destructive">Error</Badge>
          </div>
        ),
        code: `<Badge variant="default">Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Error</Badge>`,
        usage: 'Status indicators, tags, categories'
      }
    ];

    return (
      <div className="space-y-8">
        {patterns.map((pattern) => (
          <div key={pattern.name} className="border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">{pattern.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{pattern.usage}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(pattern.code, pattern.name)}
              >
                {copiedItem === pattern.name ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <h5 className="font-medium mb-2">Preview</h5>
                <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-center">
                  {pattern.component}
                </div>
              </div>
              
              <div className="flex-1">
                <h5 className="font-medium mb-2">Code</h5>
                <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{pattern.code}</code>
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ResponsiveBreakpoints = () => {
    const breakpoints = [
      { name: 'Mobile', icon: <Smartphone className="h-5 w-5" />, size: '320px - 767px', class: 'sm:', usage: 'Base styles, mobile-first' },
      { name: 'Tablet', icon: <Tablet className="h-5 w-5" />, size: '768px - 1023px', class: 'md:', usage: 'Tablet layouts, medium screens' },
      { name: 'Desktop', icon: <Monitor className="h-5 w-5" />, size: '1024px+', class: 'lg:', usage: 'Desktop layouts, large screens' },
      { name: 'Large Desktop', icon: <Monitor className="h-5 w-5" />, size: '1280px+', class: 'xl:', usage: 'Wide desktop layouts' },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {breakpoints.map((bp) => (
          <Card key={bp.name}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                {bp.icon}
                {bp.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm font-medium">{bp.size}</div>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded block">{bp.class}</code>
                <p className="text-xs text-gray-600">{bp.usage}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Iterativ Analytics Design System
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive style guide ensuring consistent, accessible, and professional 
          user interface across all platform components.
        </p>
      </div>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Components
          </TabsTrigger>
          <TabsTrigger value="responsive" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Responsive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Color Palette</h3>
            <p className="text-gray-600 mb-6">
              Consistent color system ensuring accessibility and brand alignment.
            </p>
            <ColorPalette />
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Typography Scale</h3>
            <p className="text-gray-600 mb-6">
              Harmonious type system providing clear visual hierarchy and readability.
            </p>
            <TypographySystem />
          </div>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Component Patterns</h3>
            <p className="text-gray-600 mb-6">
              Reusable UI patterns ensuring consistency across the platform.
            </p>
            <ComponentPatterns />
          </div>
        </TabsContent>

        <TabsContent value="responsive" className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Responsive Breakpoints</h3>
            <p className="text-gray-600 mb-6">
              Mobile-first responsive design system for optimal experience across devices.
            </p>
            <ResponsiveBreakpoints />
          </div>
        </TabsContent>
      </Tabs>

      {/* Usage Guidelines */}
      <div className="mt-12 bg-blue-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">Implementation Guidelines</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Do's</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• Use consistent spacing (4px base unit)</li>
              <li>• Maintain minimum 4.5:1 contrast ratio</li>
              <li>• Follow mobile-first responsive approach</li>
              <li>• Use semantic HTML elements</li>
              <li>• Test with keyboard navigation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Don'ts</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• Don't use colors outside the defined palette</li>
              <li>• Don't create custom button variants</li>
              <li>• Don't ignore responsive breakpoints</li>
              <li>• Don't use absolute positioning unnecessarily</li>
              <li>• Don't override focus states</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemGuide;