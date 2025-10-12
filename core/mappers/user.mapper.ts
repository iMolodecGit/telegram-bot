import {UserEntity} from "../entities/user.entity";

export class UserMapper {

    // public static toDomain(itemsEntity:ItemsEntity): ItemsDto {
    //
    //     let itemDto: ItemsDto = new ItemsDto();
    //     itemDto.id = itemsEntity.id;
    //     itemDto.name = itemsEntity.name;
    //     itemDto.price = itemsEntity.price;
    //     itemDto.description = itemsEntity.description;
    //     itemDto.category_id = itemsEntity.category_id;
    //     itemDto.createdAt = itemsEntity.createdAt;
    //     itemDto.image = itemsEntity.image;
    //     itemDto.hidden = itemsEntity.hidden;
    //     itemDto.is_new = itemsEntity.is_new;
    //
    //     return itemDto;
    // }

    public static toEntity(userDto: any): UserEntity {
        let user: UserEntity = new UserEntity();


        user.id = userDto.id;
        user.name = userDto.name;
        user.first_name = userDto.first_name;
        user.chat_id = userDto.chat_id;
        user.phone_number = userDto.phone_number;
        user.photo_1 = userDto.photo_1;

        return user;
    }
}