export interface ComponentExample {
    name: string;
    description: string;
    code: string;
    preview?: string;
}

export interface ComponentDoc {
    name: string;
    description: string;
    category: string;
    status: 'stable' | 'beta' | 'alpha' | 'deprecated';
    examples: ComponentExample[];
    props?: ComponentProp[];
    installation: string;
    usage: string;
    dependencies?: string[];
}

export interface ComponentProp {
    name: string;
    type: string;
    description: string;
    required: boolean;
    default?: string;
}

export interface Block {
    name: string;
    description: string;
    category: string;
    preview: string;
    code: string;
    components: string[];
}

export interface Chart {
    name: string;
    description: string;
    type: 'area' | 'bar' | 'line' | 'pie' | 'radar' | 'scatter';
    preview: string;
    code: string;
    data?: unknown;
}