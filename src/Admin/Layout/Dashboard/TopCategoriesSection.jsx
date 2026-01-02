import React from 'react';

const TopCategoriesSection = () => {
  const categories = [
    { 
      name: 'Handbags & Totes', 
      sales: 1247, 
      revenue: '$284,560', 
      percentage: 32 
    },
    { 
      name: 'Briefcases & Laptop Bags', 
      sales: 892, 
      revenue: '$198,340', 
      percentage: 24 
    },
    { 
      name: 'Wallets & Accessories', 
      sales: 1534, 
      revenue: '$145,890', 
      percentage: 18 
    },
    { 
      name: 'Travel & Luggage', 
      sales: 456, 
      revenue: '$128,970', 
      percentage: 15 
    },
    { 
      name: 'Belts & Small Goods', 
      sales: 723, 
      revenue: '$89,450', 
      percentage: 11 
    }
  ];

  return (
    <section>
      <div className="bg-card rounded-lg border border-border/50 shadow-sm">
        <div className="px-8 py-6 border-b border-border/50">
          <h2 className="text-xl font-sans font-light">Top Categories</h2>
        </div>
        
        <div className="p-8">
          <div className="space-y-6">
            {categories.map((category, index) => (
              <div key={index} className="group">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-sm font-medium">{category.name}</h3>
                  <span className="text-sm text-muted-foreground">{category.revenue}</span>
                </div>
                
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {category.percentage}%
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {category.sales} sales
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCategoriesSection;