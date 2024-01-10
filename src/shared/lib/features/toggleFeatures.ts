import { FeatureFlags } from "@/shared/types/featureFlags";
import { getFeatureFlag } from "./setGetFeatures";

interface ToggleFeaturesOptions<T> {
    name: keyof FeatureFlags;
    on: () => T;
    off: () => T;
}

export function toggleFeatures<T>({ name, off, on }: ToggleFeaturesOptions<T>): T {
    if (getFeatureFlag(name)) {
        return on();
    }
    return off();
}
