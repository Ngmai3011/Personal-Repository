package mai.FinalProject.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

import mai.FinalProject.entity.SocialMedia;

public interface SocialMediaRepository extends CrudRepository<SocialMedia, Long> {
    List<SocialMedia> findByName(String name);   
}