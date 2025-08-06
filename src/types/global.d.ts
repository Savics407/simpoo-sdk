export {}; // Ensure this file is treated as a module

declare global {
  type Icons = {
    [key: string]:
      | React.ReactElement<string | React.JSXElementConstructor<any>>
      | any;
  };

  type ItemData = {
    all_quantity: string;
    uuid: string;
    name: string;
    created_date: string;
    last_update_date: string;
    total_sold: number;
    description: string;
    item_brand: string;
    discount: string;
    discount_type: number;
    images: {
      featured: boolean;
      id: number;
      image: string;
      uuid: string | null;
    }[];
    itemcode: number;
    cost_price: string;
    selling_price: string;
    prices: {
      selling_price: number;
      default: boolean;
      priceGroup: {
        uuid: string;
        name: string;
        description: string;
        business: string;
        default: boolean;
        items_count: string | number;
        status: boolean;
      };
    }[];

    duplicate_prices: {
      selling_price: string;
      default: boolean;
      priceGroup: {
        uuid: string;
        name: string;
        default: boolean;
      };
    }[];
    sku: string;
    item_mackup: string | number;
    returnable_days: string | number;
    quantity: string;
    reorder_level: string;
    status: boolean;
    barcode: { id: number; barcode: string }[];
    locations: {
      uuid: string;
      warehouse: boolean;
      name: string;
      address: string;
      status: string;
      phone: string | number;
      state: {
        id: number;
        name: string;
      };
      country: {
        id: number;
        name: string;
        phonecode: string;
        currency: string;
        iso2: string;
        iso3: string;
        flag: string;
        wikiDataId: string | number;
      };
      employee_count: number;
    }[];
    unit_resource: {
      uuid: string;
      name: string;
      decimal: number;
      abbreviation: string;
    };
    item_unit: string;
    category: {
      uuid: string;
      depth: number;
      name: string;
      description: string;
      subCategories: {
        uuid: string;
        depth: number;
        name: string;
        description: string;
        subCategories: [];
        images: [];
      }[];
      images: [];
    }[];
    suppliers: {
      uuid: string;
      name: string;
      supplier_price: string;
      supplier_batch_number: string;
      supplier_quantity: string;
      supplier_expired_date: string;
    }[];
    item_group: {
      id: number;
      group_uuid: string;
      group_name: string;
      cost_price: string;
      selling_price: string;
      quantity: string;
      barcode: string;
      locationprices: [
        {
          id: number;
          selling_price: string;
          price_group: {
            uuid: string;
            name: string;
          };
        }
      ];
    }[];
    item_tax: {
      uuid: string;
      name: string;
      rate: string;
      taxtype: {
        id: number;
        name: string;
      };
    };
    item_type: {
      uuid: string;
      name: string;
      description: string;
    };
    variation: {
      uuid: string;
      sku: string;
      cost_price: string;
      price: any;
      quantity: string;
      barcode: string;
      image: any;
      variation_values: {
        attribute: {
          uuid: string;
          name: string;
        };
        attribute_value: {
          uuid: string;
          value_name: string;
        };
      }[];
      locationprices: {
        id: number;
        selling_price: string;
        price_group: {
          uuid: string;
          name: string;
        };
      }[];
    }[];
    extras: {
      uuid: string;
      selling_price: string;
      extra: ItemData;
      quantity: string;
    }[];
    material: {
      uuid: string;
      selling_price: string;
      raw_material: ItemData;
      quantity: string;
    }[];
    item_tags: {
      uuid: string;
      name: string;
      description: string;
      products: any;
      status: string;
    }[];
    kits: {
      uuid: string;
      quantity: string;
      kit_item: ItemData;
    }[];
    expired: number;
    expiring: number;
    collections: [];
    total_selling_price: number;
    total_cost_price: number;
  };

  type Tab = {
    label: string;
    count?: number;
    link?: string;
    action?: () => void;
  };

  type IInput = {
    label?: string;
    infoAlignment?: "start" | "center" | "end";
    addonInfoAlignment?: "start" | "center" | "end";
    showNegative?: boolean;
    showPositive?: boolean;
    addonLabel?: string;
    info?: string;
    addonInfo?: string;
    type?: string;
    placeholder?: string;
    selectPlaceholder?: string;
    error?: string;
    success?: boolean;
    value?: string | number;
    defaultValue?: string | number;
    name?: string;
    id?: string;
    formik?: boolean;
    onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
    onBlur?: React.InputHTMLAttributes<HTMLInputElement>["onBlur"];
    inputRef?: React.Ref<HTMLInputElement>;
    required?: boolean;
    optional?: boolean;
    disabled?: boolean;
    loading?: boolean;
    icon?: ReactNode | string;
    showError?: boolean;
    className?: string;
    selectOptions?: IOption[];
    showSelectSearch?: boolean;
    selectValue?: string;
    disableSearch?: boolean;
    searchSelectPlaceholder?: string;
    onSelectValueChange?: (value: string) => void;
    rows?: number;
    cols?: number;
    showOutline?: boolean;
    labelClass?: string;
    addonLabelClass?: string;
    actionIcon?: ReactNode;
    actionLabel?: string;
    actionLabelInfo?: string;
    actionLabelAction?: () => void;
    textAreaOnChange?: React.TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"];
    [key: string]: any;
    addOn?: string;
    inputContainerClass?: string;
    autoComplete?: string;
  };
}
