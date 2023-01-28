package mai.FinalProject.repository;

import java.util.List;
import mai.FinalProject.entity.*;
import org.springframework.data.repository.CrudRepository;

public interface FrequencyRepository extends CrudRepository<Frequency, Long> {
	List<Frequency> findByName(String name);
}
