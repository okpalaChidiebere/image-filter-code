import {Table, Column, Model, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table({tableName: 'ImageFilter'})
export class ImageF extends Model<ImageF>{

    @Column
    public url!: string; // for nullable fields

    @Column
    @CreatedAt
    public createdAt: Date = new Date();

    @Column
    @UpdatedAt
    public updatedAt: Date = new Date();

}

