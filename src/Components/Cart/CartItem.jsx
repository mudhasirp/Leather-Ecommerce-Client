
import React from "react";
import { Minus, Plus, X } from "lucide-react";


export default function CartItem({ item, onIncrease, onDecrease, onRemove, index = 0 }) {
    
  return (
    <div
      className="bg-card rounded-xl p-5 md:p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        
        <div className="flex-shrink-0">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full md:w-28 h-40 md:h-28 object-cover rounded-lg"
          />
        </div>

        <div className="flex-grow space-y-3">
          <div>
            <h3 className="font-sans text-xl text-card-foreground mb-1">{item.name}</h3>
            <div className="flex gap-3 text-muted-foreground text-sm">
              <span>{Number(item.quantity)*Number(item.weight)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            
            <div className="font-sans text-xl text-primary">
              ₹{Number(item.price).toFixed(2)}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-1.5">
                <button
                  onClick={() => onDecrease(item.id)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <span className="font-sans text-base w-6 text-center">
                  {item.quantity}
                </span>

               <button
  onClick={() => onIncrease(item.id)}
  disabled={item.quantity >= item.stock}
  className={`text-muted-foreground transition-colors 
    ${item.quantity >= item.stock
      ? "opacity-40 cursor-not-allowed"
      : "hover:text-primary"
    }`}
>
  <Plus className="w-3.5 h-3.5" />
</button>

              </div>

              <button
                onClick={() => onRemove(item.id)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
