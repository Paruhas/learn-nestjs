import {
  Injectable,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectDataSource() private readonly datasource: DataSource,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getAllUser() {
    return this.userRepository.find();
  }

  getUserById(id: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.firstname', 'user.lastname'])
      .where('user.id = id', { id })
      .getOne();
  }

  async createUser(req: CreateUserDto) {
    const transaction = await this.datasource.createQueryRunner();
    await transaction.connect();
    await transaction.startTransaction();

    try {
      // if (req.firstname.toLowerCase() === 'sex') {
      //   this.logger.error(`Error banned text.`);
      //   throw new InternalServerErrorException('Error banned text.');
      // }
      // this.logger.log(`create user ${JSON.stringify(req)}`);

      // /* มี 2 ท่า  */
      // const user = new UserEntity();
      // Object.assign(user, {
      //   firstname: req.firstname,
      //   lastname: req.lastname,
      //   email: req.email,
      //   age: req.age,
      //   tel: req.tel,
      //   createdAt: new Date().toISOString(),
      // });
      // await this.userRepository.save(user);

      // await this.userRepository.insert({
      //   firstname: req.firstname,
      //   lastname: req.lastname,
      //   email: req.email,
      //   age: req.age,
      //   tel: req.tel,
      //   createdAt: new Date().toISOString(),
      // });

      const user = await this.userRepository.findOne({
        where: { firstname: req.firstname },
      });
      if (user)
        throw new InternalServerErrorException('User firstname duplicate.');

      await transaction.manager.insert(UserEntity, {
        firstname: req.firstname,
        lastname: req.lastname,
        email: req.email,
        age: req.age,
        tel: req.tel,
        createdAt: new Date().toISOString(),
      });

      await transaction.commitTransaction();

      return new HttpException('success', HttpStatus.OK);
    } catch (error) {
      await transaction.rollbackTransaction();

      throw error;
    }
  }

  async updateUser(req: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id: req.id } });
      if (!user) throw new InternalServerErrorException('User not found.');

      // /* มี 2 ท่า  */
      // const user = new UserEntity();
      // Object.assign(user, {
      //   firstname: req.firstname,
      //   lastname: req.lastname,
      //   email: req.email,
      //   age: req.age,
      //   tel: req.tel,
      //   createdAt: new Date().toISOString(),
      // });
      // await this.userRepository.update(req.id, user);

      await this.userRepository.update(req.id, {
        firstname: req.firstname,
        lastname: req.lastname,
        email: req.email,
        age: req.age,
        tel: req.tel,
      });

      return new HttpException('success', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) throw new InternalServerErrorException('User not found.');

      await this.userRepository.delete({ id: id });

      return new HttpException('success', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  //   create(createUserDto: CreateUserDto) {
  //     return 'This action adds a new user';
  //   }
  //   findAll() {
  //     return `This action returns all user`;
  //   }
  //   findOne(id: number) {
  //     return `This action returns a #${id} user`;
  //   }
  //   update(id: number, updateUserDto: UpdateUserDto) {
  //     return `This action updates a #${id} user`;
  //   }
  //   remove(id: number) {
  //     return `This action removes a #${id} user`;
  //   }
}
