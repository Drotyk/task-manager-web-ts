export type Factory<T> = (container: Container) => T;

export class Container {
    private services = new Map<string, any>();
    private factories = new Map<string, Factory<any>>();

    public set<T>(name: string, factory: Factory<T>): void {
        this.factories.set(name, factory);
    }

    public get<T>(name: string): T {
        if (this.services.has(name)) {
            return this.services.get(name);
        }

        const factory = this.factories.get(name);
        if (!factory) {
            throw new Error(`Service ${name} not found in container`);
        }

        const instance = factory(this);
        this.services.set(name, instance);
        return instance;
    }
}
