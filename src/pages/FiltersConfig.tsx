
import { useState } from "react";
import { Filter, X, Plus, GripVertical, Check, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Define proper types to solve type errors
interface FilterOption {
  id: string;
  label: string;
  value: string;
  checked: boolean;
}

interface BaseFilter {
  id: number;
  name: string;
  type: string;
  isExpanded: boolean;
  isEnabled: boolean;
}

interface CheckboxFilter extends BaseFilter {
  type: 'checkbox' | 'radio';
  options: FilterOption[];
  min?: undefined;
  max?: undefined;
  step?: undefined;
}

interface RangeFilter extends BaseFilter {
  type: 'range';
  min: number;
  max: number;
  step: number;
  options?: undefined;
}

type FilterType = CheckboxFilter | RangeFilter;

// Initial filter categories
const initialFilters: FilterType[] = [
  {
    id: 1,
    name: "Categories",
    type: "checkbox",
    isExpanded: true,
    isEnabled: true,
    options: [
      { id: "c1", label: "Office Furniture", value: "office-furniture", checked: true },
      { id: "c2", label: "Electronics", value: "electronics", checked: true },
      { id: "c3", label: "Storage", value: "storage", checked: true },
      { id: "c4", label: "Stationery", value: "stationery", checked: true }
    ]
  },
  {
    id: 2,
    name: "Price Range",
    type: "range",
    isExpanded: true,
    isEnabled: true,
    min: 0,
    max: 1000,
    step: 10
  },
  {
    id: 3,
    name: "Brand",
    type: "checkbox",
    isExpanded: true,
    isEnabled: true,
    options: [
      { id: "b1", label: "InvenFlow", value: "invenflow", checked: true },
      { id: "b2", label: "OfficePro", value: "officepro", checked: true },
      { id: "b3", label: "TechDesk", value: "techdesk", checked: true },
      { id: "b4", label: "ErgoMaster", value: "ergomaster", checked: true }
    ]
  },
  {
    id: 4,
    name: "Availability",
    type: "checkbox",
    isExpanded: true,
    isEnabled: true,
    options: [
      { id: "a1", label: "In Stock", value: "in-stock", checked: true },
      { id: "a2", label: "Out of Stock", value: "out-of-stock", checked: false },
      { id: "a3", label: "Pre-order", value: "pre-order", checked: true }
    ]
  },
  {
    id: 5,
    name: "Ratings",
    type: "radio",
    isExpanded: true,
    isEnabled: true,
    options: [
      { id: "r1", label: "4★ & above", value: "4-stars", checked: false },
      { id: "r2", label: "3★ & above", value: "3-stars", checked: false },
      { id: "r3", label: "2★ & above", value: "2-stars", checked: false },
      { id: "r4", label: "1★ & above", value: "1-star", checked: false }
    ]
  }
];

const FiltersConfig = () => {
  const [filters, setFilters] = useState<FilterType[]>(initialFilters);
  const [newFilterName, setNewFilterName] = useState("");
  const [newFilterType, setNewFilterType] = useState<"checkbox" | "radio" | "range">("checkbox");
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleFilterToggle = (filterId: number) => {
    setFilters(filters.map(filter => 
      filter.id === filterId ? { ...filter, isEnabled: !filter.isEnabled } : filter
    ));
  };

  const handleExpandToggle = (filterId: number) => {
    setFilters(filters.map(filter => 
      filter.id === filterId ? { ...filter, isExpanded: !filter.isExpanded } : filter
    ));
  };

  const handleOptionToggle = (filterId: number, optionId: string) => {
    setFilters(filters.map(filter => {
      if (filter.id === filterId && (filter.type === "checkbox" || filter.type === "radio")) {
        return {
          ...filter,
          options: filter.options.map(option => 
            option.id === optionId ? { ...option, checked: !option.checked } : option
          )
        };
      }
      return filter;
    }));
  };

  const handleRadioChange = (filterId: number, optionId: string) => {
    setFilters(filters.map(filter => {
      if (filter.id === filterId && filter.type === "radio") {
        return {
          ...filter,
          options: filter.options.map(option => 
            ({ ...option, checked: option.id === optionId })
          )
        };
      }
      return filter;
    }));
  };

  const handleAddOption = (filterId: number) => {
    const filter = filters.find(f => f.id === filterId);
    if (!filter || (filter.type !== "checkbox" && filter.type !== "radio")) return;
    
    const newOption = {
      id: `option-${Date.now()}`,
      label: "New Option",
      value: `new-option-${Date.now()}`,
      checked: false
    };
    
    setFilters(filters.map(filter => {
      if (filter.id === filterId && (filter.type === "checkbox" || filter.type === "radio")) {
        return {
          ...filter,
          options: [...filter.options, newOption]
        };
      }
      return filter;
    }));
  };

  const handleOptionLabelChange = (filterId: number, optionId: string, newLabel: string) => {
    setFilters(filters.map(filter => {
      if (filter.id === filterId && (filter.type === "checkbox" || filter.type === "radio")) {
        return {
          ...filter,
          options: filter.options.map(option => 
            option.id === optionId ? { ...option, label: newLabel, value: newLabel.toLowerCase().replace(/\s+/g, '-') } : option
          )
        };
      }
      return filter;
    }));
  };

  const handleRemoveOption = (filterId: number, optionId: string) => {
    setFilters(filters.map(filter => {
      if (filter.id === filterId && (filter.type === "checkbox" || filter.type === "radio")) {
        return {
          ...filter,
          options: filter.options.filter(option => option.id !== optionId)
        };
      }
      return filter;
    }));
  };

  const handleFilterNameChange = (filterId: number, newName: string) => {
    setFilters(filters.map(filter => 
      filter.id === filterId ? { ...filter, name: newName } : filter
    ));
  };

  const handleAddFilter = () => {
    if (!newFilterName.trim()) {
      toast({
        title: "Error",
        description: "Filter name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    let newFilter: FilterType;

    if (newFilterType === "checkbox" || newFilterType === "radio") {
      newFilter = {
        id: Date.now(),
        name: newFilterName,
        type: newFilterType,
        isExpanded: true,
        isEnabled: true,
        options: [
          { id: `new-${Date.now()}-1`, label: "Option 1", value: "option-1", checked: false },
          { id: `new-${Date.now()}-2`, label: "Option 2", value: "option-2", checked: false }
        ]
      };
    } else {
      newFilter = {
        id: Date.now(),
        name: newFilterName,
        type: "range",
        isExpanded: true,
        isEnabled: true,
        min: 0,
        max: 100,
        step: 1
      };
    }

    setFilters([...filters, newFilter]);
    setNewFilterName("");
    setNewFilterType("checkbox");
    
    toast({
      title: "Filter added",
      description: `New filter "${newFilterName}" has been added.`
    });
  };

  const handleRemoveFilter = (filterId: number) => {
    setFilters(filters.filter(filter => filter.id !== filterId));
    toast({
      title: "Filter removed",
      description: "The filter has been removed."
    });
  };

  const handleDragStart = (filterId: number) => {
    setDraggedItemId(filterId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: number) => {
    if (draggedItemId === null || draggedItemId === targetId) return;
    
    const draggedIndex = filters.findIndex(filter => filter.id === draggedItemId);
    const targetIndex = filters.findIndex(filter => filter.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;
    
    const newFilters = [...filters];
    const [draggedFilter] = newFilters.splice(draggedIndex, 1);
    newFilters.splice(targetIndex, 0, draggedFilter);
    
    setFilters(newFilters);
    setDraggedItemId(null);
  };

  const handleRangeInputChange = (
    filterId: number, 
    field: 'min' | 'max' | 'step', 
    value: string
  ) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;

    setFilters(filters.map(filter => {
      if (filter.id === filterId && filter.type === 'range') {
        return {
          ...filter,
          [field]: numValue
        };
      }
      return filter;
    }));
  };

  const handleSaveConfig = () => {
    // In a real app, this would save to backend/storage
    toast({
      title: "Configuration saved",
      description: "Your filter configuration has been saved successfully!",
    });
  };

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Filter Configuration</h1>
        </div>
        <Button onClick={handleSaveConfig} variant="green" className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Configuration
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Active Filters</CardTitle>
              <CardDescription>
                Drag and drop to reorder filters. Toggle to enable/disable.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filters.map(filter => (
                <div 
                  key={filter.id}
                  draggable
                  onDragStart={() => handleDragStart(filter.id)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(filter.id)}
                  className={`border rounded-lg p-4 ${draggedItemId === filter.id ? 'opacity-50' : ''} ${!filter.isEnabled ? 'opacity-60 bg-muted/50' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button className="cursor-grab hover:text-primary">
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                      </button>
                      <Input 
                        value={filter.name} 
                        onChange={(e) => handleFilterNameChange(filter.id, e.target.value)} 
                        className="w-40 h-8"
                      />
                      <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                        {filter.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`filter-toggle-${filter.id}`}
                          checked={filter.isEnabled}
                          onCheckedChange={() => handleFilterToggle(filter.id)}
                        />
                        <Label htmlFor={`filter-toggle-${filter.id}`} className="text-sm">
                          {filter.isEnabled ? 'Enabled' : 'Disabled'}
                        </Label>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleExpandToggle(filter.id)}
                      >
                        {filter.isExpanded ? '-' : '+'}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleRemoveFilter(filter.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {filter.isExpanded && (
                    <div className="mt-4 pl-7">
                      {(filter.type === "checkbox" || filter.type === "radio") && (
                        <div className="space-y-2">
                          {filter.options.map(option => (
                            <div key={option.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {filter.type === "checkbox" ? (
                                  <Checkbox 
                                    id={`option-${option.id}`}
                                    checked={option.checked}
                                    onCheckedChange={() => handleOptionToggle(filter.id, option.id)}
                                  />
                                ) : (
                                  <input 
                                    type="radio" 
                                    id={`option-${option.id}`}
                                    checked={option.checked}
                                    onChange={() => handleRadioChange(filter.id, option.id)}
                                    className="h-4 w-4"
                                  />
                                )}
                                <Input 
                                  value={option.label}
                                  onChange={(e) => handleOptionLabelChange(filter.id, option.id, e.target.value)}
                                  className="w-40 h-8"
                                />
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => handleRemoveOption(filter.id, option.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => handleAddOption(filter.id)}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add Option
                          </Button>
                        </div>
                      )}
                      
                      {filter.type === "range" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`min-${filter.id}`}>Min Value</Label>
                              <Input 
                                id={`min-${filter.id}`}
                                type="number"
                                value={filter.min}
                                onChange={(e) => handleRangeInputChange(filter.id, 'min', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`max-${filter.id}`}>Max Value</Label>
                              <Input 
                                id={`max-${filter.id}`}
                                type="number"
                                value={filter.max}
                                onChange={(e) => handleRangeInputChange(filter.id, 'max', e.target.value)}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor={`step-${filter.id}`}>Step</Label>
                            <Input 
                              id={`step-${filter.id}`}
                              type="number"
                              value={filter.step}
                              onChange={(e) => handleRangeInputChange(filter.id, 'step', e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              {filters.length === 0 && (
                <div className="text-center py-8 border rounded-lg">
                  <p className="text-muted-foreground">No filters configured.</p>
                  <p className="text-sm text-muted-foreground mt-1">Add your first filter using the form below.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add New Filter</CardTitle>
              <CardDescription>
                Create a new filter for your product catalog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="new-filter-name">Filter Name</Label>
                  <Input 
                    id="new-filter-name"
                    placeholder="e.g. Color, Size, Material"
                    value={newFilterName}
                    onChange={(e) => setNewFilterName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="new-filter-type">Filter Type</Label>
                  <select 
                    id="new-filter-type"
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1"
                    value={newFilterType}
                    onChange={(e) => setNewFilterType(e.target.value as "checkbox" | "radio" | "range")}
                  >
                    <option value="checkbox">Checkbox (Multiple Selection)</option>
                    <option value="radio">Radio (Single Selection)</option>
                    <option value="range">Range Slider</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddFilter} variant="green">
                <Plus className="h-4 w-4 mr-1" /> Add Filter
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Filter Preview</CardTitle>
              <CardDescription>This is how filters will appear to customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {filters
                .filter(filter => filter.isEnabled)
                .map(filter => (
                  <div key={filter.id} className="space-y-3">
                    <h3 className="font-medium">{filter.name}</h3>
                    
                    {filter.type === "checkbox" && filter.options && filter.options.length > 0 && (
                      <div className="space-y-2">
                        {filter.options.map(option => (
                          <div key={option.id} className="flex items-center gap-2">
                            <Checkbox id={`preview-${option.id}`} checked={option.checked} />
                            <Label htmlFor={`preview-${option.id}`}>{option.label}</Label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {filter.type === "radio" && filter.options && filter.options.length > 0 && (
                      <div className="space-y-2">
                        {filter.options.map(option => (
                          <div key={option.id} className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              id={`preview-${option.id}`}
                              checked={option.checked}
                              readOnly
                              className="h-4 w-4"
                            />
                            <Label htmlFor={`preview-${option.id}`}>{option.label}</Label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {filter.type === "range" && (
                      <div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{filter.min}</span>
                          <span>{filter.max}</span>
                        </div>
                        <input 
                          type="range" 
                          min={filter.min} 
                          max={filter.max}
                          step={filter.step}
                          className="w-full"
                        />
                      </div>
                    )}
                    
                    <Separator />
                  </div>
                ))}
              
              {filters.filter(filter => filter.isEnabled).length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No enabled filters to display</p>
                </div>
              )}
              
              <Button className="w-full mt-4" variant="outline">
                <Check className="h-4 w-4 mr-1" /> Apply Filters
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FiltersConfig;
