package mai.FinalProject.entity;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Frequency {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long frequencyid; 
	private  String name; 
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "frequency")
	private List<SocialMedia> socialmedias;

	
	public Frequency() { } 
	
	public Frequency(String name) {
		super();
		this.name=name;
	}

	public Long getFrequencyid() {
		return frequencyid;
	}

	public void setFrequencyid(Long frequencyid) {
		this.frequencyid = frequencyid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public List<SocialMedia> getSocialMedias() {
		return socialmedias;
	}

	public void setSocialMedias(List<SocialMedia> socialmedias) {
		this.socialmedias = socialmedias;
	}
	
	@Override
	public String toString() {
		return "Frequency [frequencyid = " + frequencyid + ", name = " + name + "]";
	}
}
