package mai.FinalProject;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import mai.FinalProject.entity.*;
import mai.FinalProject.repository.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class SocialMediaRepositoryTest {

    @Autowired
    private SocialMediaRepository repository;
    @Autowired
    private FrequencyRepository frerepository;
    @Autowired
    private UserRepository userepository;
    
    @Test
    public void findByNameShouldReturnPlatforms() {
    	List<SocialMedia> socialmedias = repository.findByName("Mai Hoang");
    	assertThat(socialmedias).hasSize(1);
    	assertThat(socialmedias.get(0).getPlatform()).isEqualTo("Facebook, Tiktok");
    }
    
    @Test
    public void createNewUser() {
    	User user = new User("Linh", "2704yeulaxalaquen98..@tuanhungxaxoingayay","USER");
    	userepository.save(user);
    	assertThat(user.getId()).isNotNull();
    }
    
    @Test
    public void createNewSocialMedia() {
    	SocialMedia socialmedia = new SocialMedia(3L,"Lam H",15,"Facebook, Twitter", frerepository.findByName("3-6 hours/day").get(0),"Study");
    	repository.save(socialmedia);
    	assertThat(socialmedia.getId()).isNotNull();
    } 
    
    @Test
    public void deleteNewSocialMedia() {
		List<SocialMedia> socialmedias = repository.findByName("Mai Hoang");
		SocialMedia socialmedia = socialmedias.get(0);
		repository.delete(socialmedia);
		List<SocialMedia> newSocialMedias = repository.findByName("A farewell to Arms");
		assertThat(newSocialMedias).hasSize(0);
     }
}
