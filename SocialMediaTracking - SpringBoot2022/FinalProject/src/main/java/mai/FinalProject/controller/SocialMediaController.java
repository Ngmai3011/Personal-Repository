package mai.FinalProject.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;

import mai.FinalProject.entity.*;
import mai.FinalProject.repository.*;

@Controller
public class SocialMediaController {
	
	@Autowired
	private SocialMediaRepository repository; 
	
	@Autowired
	private FrequencyRepository frerepository; 
	
    @RequestMapping(value="/login")
    public String login() {	
        return "login";
    }	
	
	@GetMapping(value="/socialmedia")
	public @ResponseBody List<SocialMedia> socialMediaRecordRest() {
			return (List<SocialMedia>) repository.findAll();
	}
			
	@GetMapping(value={"/", "/socialMediaRecord"})
	public String socialMediaRecord(Model model) {
			model.addAttribute("socialmedias", repository.findAll());
			model.addAttribute("count",repository.count());
			return "socialMediaRecord";
	}
	
	@GetMapping(value="/socialmedia/{id}")
	public @ResponseBody Optional<SocialMedia> findSocialMediaRest(@PathVariable("id") Long socialMediaId) {
			return repository.findById(socialMediaId);
	}
	
	@GetMapping(value = "/add")
    public String addSocialMedia(Model model){
    	model.addAttribute("socialmedia", new SocialMedia());
    	model.addAttribute("frequency", frerepository.findAll());
        return "addSocialMedia";
    }     
    
    @PostMapping(value = "/save")
    public String saveSocialMedia(SocialMedia socialmedia){
        repository.save(socialmedia);
        return "redirect:socialMediaRecord";
    }    

    @GetMapping(value = "/delete/{id}")
    public String deleteSocialMedia(@PathVariable("id") Long id, Model model) {
    	repository.deleteById(id);
        return "redirect:../socialMediaRecord";
    }    

    @GetMapping(value = "/edit/{id}")
    public String editSocialMedia(@PathVariable("id") Long id, Model model) {
    	model.addAttribute("socialmedia", repository.findById(id));
    	model.addAttribute("frequency", frerepository.findAll());
    	return "editSocialMedia";
    } 
	
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value = "/chart")
    public String getAllUse(Model model) {
    	List<String> nameList = ((List<SocialMedia>) repository.findAll()).stream().map(x->x.getName()).collect(Collectors.toList());
    	List<Integer> ageList = ((List<SocialMedia>) repository.findAll()).stream().map(x->x.getAge()).collect(Collectors.toList());
    	model.addAttribute("name", nameList);
    	model.addAttribute("age", ageList);
    	return "charts";
    }

}