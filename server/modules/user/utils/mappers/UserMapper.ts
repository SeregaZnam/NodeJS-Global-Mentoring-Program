import { User } from '../../models/user';
import { UserDTO } from '../../dto/userDTO';

export class UserMapper {
	static toDTO(user: User): UserDTO {
		const { password, createdAt, updatedAt, ...userDTO } = user;
		return userDTO;
	}
}
