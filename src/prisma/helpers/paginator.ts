export interface PaginatedResult<T> {
    data: T[]
    meta: {
        total: number
        last_page: number
        current_page: number
        per_page: number | 10
        prev: number | null
        next: number | null
    }
}

export type PaginateOptions = { page?: number | string, per_page?: number | string }
export type PaginateFunction = <T, K>(model: any, args?: K, options?: PaginateOptions) => Promise<PaginatedResult<T>>

export const paginator = (defaultOptions: PaginateOptions): PaginateFunction => {
    return async (model, args: any = { where: undefined }, options) => {
        const page = Number(options?.page || defaultOptions?.page) || 1;
        const per_page = Number(options?.per_page || defaultOptions?.per_page) || 10;

        const skip = page > 0 ? per_page * (page - 1) : 0;
        const [total, data] = await Promise.all([
            model.count({ where: args.where }),
            model.findMany({
                ...args,
                take: per_page,
                skip,
            }),
        ]);
        const last_page = Math.ceil(total / per_page);

        return {
            data,
            meta: {
                total,
                last_page,
                current_page: page,
                per_page,
                prev: page > 1 ? page - 1 : null,
                next: page < last_page ? page + 1 : null,
            },
        };
    };
};

export const paginate: PaginateFunction = paginator({ per_page: 10 });
