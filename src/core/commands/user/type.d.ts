declare namespace User {
    // 用户类型
    interface UserType {
        username: string;
        email?: string;
        createTime?: Date;
        updateTime?: Date;
    }
}