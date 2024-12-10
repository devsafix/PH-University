import { Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>
    public query: Record<string, unknown>

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery
        this.query = query
    }

    search(searchableField: string[]) {
        if (this.query?.searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableField.map((field) => ({
                    [field]: { $regex: this.query.searchTerm, $options: "i" }
                }))
            })
        }
        return this
    }


    filter() {
        const queryObj = { ...this.query }
        const excludeFields = ["searchTerm", "sort", "limit", "page", "field"]
        excludeFields.forEach(el => delete queryObj[el])

        this.modelQuery = this.modelQuery.find(queryObj)

        return this
    }

    sort() {
        let sort = "-createdAt"
        if (this.query.sort) {
            sort = (this.query.sort as string)?.split(',').join(' ')
        }

        this.modelQuery = this.modelQuery.sort(sort)
        return this
    }

    paginate(){
        const page =Number(this.query.page) || 1 ;
        const limit = Number(this.query.limit) || 10;
        const skip= (page-1 )*limit


        this.modelQuery=this.modelQuery.skip(skip).limit(limit)

        return this 
    }

    fields(){
        const fields = (this.query.field as string)?.split(',').join(' ') || "-__v"

        this.modelQuery=this.modelQuery.select(fields)
        return this
    }






}

export default QueryBuilder