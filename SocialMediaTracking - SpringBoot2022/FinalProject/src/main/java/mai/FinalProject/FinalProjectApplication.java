package mai.FinalProject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import mai.FinalProject.entity.*;
import mai.FinalProject.repository.*;

@SpringBootApplication
public class FinalProjectApplication {
	
	private static final Logger log = LoggerFactory.getLogger(FinalProjectApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(FinalProjectApplication.class, args);
	}

	@Bean
	public CommandLineRunner SocialMedia(SocialMediaRepository repository, FrequencyRepository frerepository, UserRepository userepository) {
		return (args) -> {
			log.info("Record some social media uses");
			
			frerepository.save(new Frequency("Less than 2 hours/day"));
			frerepository.save(new Frequency("3-6 hours/day"));
			frerepository.save(new Frequency("More than 7 hours/day"));
			frerepository.save(new Frequency("Once in a few days"));
			frerepository.save(new Frequency("Rarely"));
			frerepository.save(new Frequency("Never used"));

			
			repository.save(new SocialMedia(1L,"Mai Hoang",20,"Facebook, Tiktok", frerepository.findByName("3-6 hours/day").get(0),"Entertainment, Communication"));
			repository.save(new SocialMedia(2L,"Thomas Jr",25,"Facebook, Instagram", frerepository.findByName("More than 7 hours/day").get(0),"Entertainment"));
						
			User user = new User("user", "$2a$06$3jYRJrg0ghaaypjZ/.g4SethoeA51ph3UD4kZi9oPkeMTpjKU5uo6", "USER");
			User admin = new User("admin", "$2a$10$0MMwY.IQqpsVc1jC8u7IJ.2rT8b0Cd3b3sfIBGV2zfgnPGtT4r0.C", "ADMIN");
			userepository.save(user);
			userepository.save(admin);
			
			log.info("fetch all social media uses");
			for (SocialMedia socialmedia : repository.findAll()) {
				log.info(socialmedia.toString());
			}

		};
	}
}
