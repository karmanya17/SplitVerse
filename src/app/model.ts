export interface member{
    membername:string,
    paid:number,
    id:number
}
export interface groupdetails{
    _id?:number,
    userid?:string,
    groupname:string,
    description:string,
    member:Array<member>,
    count:number
}
export interface user{
    _id?:string,
    name:string,
    email:string,
    password:string
}
export interface LoginUser{
    email:string,
    password:string
}
export interface LoginResponse{
    message:string,
    userId:string,
    token:string
}