
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WordPressFeatureCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const WordPressFeatureCard = ({ Icon, title, description }: WordPressFeatureCardProps) => {
  return (
    <Card className="bg-card border border-border hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="mb-4 p-3 bg-muted inline-block rounded-lg">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default WordPressFeatureCard;
