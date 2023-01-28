package mai.FinalProject.entity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Table(name="SocialMediaUses")
public class SocialMedia {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id; 
	
	@ManyToOne
    @JoinColumn(name = "Frequencyid")
    private Frequency frequency;
    
	@Column(name="Name")
	private String name; 
	
	@Column(name="Age")
	private Integer age; 
	
	@Column(name="Platform")
	private String platform; 
	
	@Column(name="Purpose")
	private String purpose; 

	public SocialMedia() { } 
	
	public SocialMedia(Long id, String name, Integer age, String platform, Frequency frequency, String purpose) {
		super();
		this.id=id;
		this.name=name;
		this.age=age;
		this.platform=platform;
		this.frequency=frequency;
		this.purpose=purpose;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getPlatform() {
		return platform;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public Frequency getFrequency() {
		return frequency;
	}

	public void setFrequency(Frequency frequency) {
		this.frequency = frequency;
	}
	
	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}
	
	@Override
	 public String toString() {
	 return  "SocialMedia [SocialMedia id = " + id + ", name = " + name + ", age = " + age +
			 ", platform = " + platform + ", frequency = " + this.getFrequency() + ", purpose = " + purpose + "]";
	 }
}