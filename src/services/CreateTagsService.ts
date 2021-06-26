import { getCustomRepository } from 'typeorm';
import { TagsRepository } from '../repositories/TagsRepository';

class CreateTagsService{

    async execute(name: string){

        const tagsRepository = getCustomRepository(TagsRepository);

        if(!name){
            throw new Error("Nome de Tag incorreto!");
        }

        // SELECT * FROM TAGS WHERE NAME = 'name'
        const tagAlreadyExists = await tagsRepository.findOne({
            name
        });

        if(tagAlreadyExists){
            throw new Error("Tag já existente")
        }

        const tag = tagsRepository.create({
            name
        })

        await tagsRepository.save(tag);

        return tag;
    }
}

export { CreateTagsService }