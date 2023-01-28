package mai.FinalProject.repository;

import org.springframework.data.repository.CrudRepository;
import mai.FinalProject.entity.User;

public interface UserRepository extends CrudRepository<User, Long> {
	User findByUsername(String username);
}
