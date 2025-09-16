export interface ChartConfig {
    [key: string]: {
        label?: string;
        icon?: any;
        color?: string;
        theme?: {
            light: string;
            dark: string;
        };
    };
}

export type ChartConfigType = ChartConfig;