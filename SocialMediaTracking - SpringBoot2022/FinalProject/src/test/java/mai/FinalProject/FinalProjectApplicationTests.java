package mai.FinalProject;

import org.springframework.beans.factory.annotation.Autowired;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.boot.test.context.SpringBootTest;

import mai.FinalProject.controller.SocialMediaController;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class FinalProjectApplicationTests {

	@Autowired
	 private SocialMediaController controller;

	@Test
	 public void contexLoads() throws Exception {
       assertThat(controller).isNotNull();
   }	
}
