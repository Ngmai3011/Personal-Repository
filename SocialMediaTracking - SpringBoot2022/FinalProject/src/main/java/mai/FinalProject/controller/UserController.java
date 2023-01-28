package mai.FinalProject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import mai.FinalProject.entity.SignUp;
import mai.FinalProject.entity.User;
import mai.FinalProject.repository.UserRepository;

import javax.validation.Valid;

@Controller
public class UserController {
	@Autowired
    private UserRepository repository; 
	
    @RequestMapping(value = "signup")
    public String SignUp(Model model){
    	model.addAttribute("signup", new SignUp());
        return "signup";
    }	
    
    @PostMapping(value = "saveuser")
    public String save(@Valid @ModelAttribute("signup") SignUp signup, BindingResult bindingResult) {
    	if (!bindingResult.hasErrors()) { 
    		if (signup.getPassword().equals(signup.getPasswordCheck())) { 		
	    		String pwd = signup.getPassword();
		    	BCryptPasswordEncoder bc = new BCryptPasswordEncoder();
		    	String hashPwd = bc.encode(pwd);
	
		    	User newUser = new User();
		    	newUser.setPasswordHash(hashPwd);
		    	newUser.setUsername(signup.getUsername());
		    	newUser.setRole("USER");
		    	if (repository.findByUsername(signup.getUsername()) == null) { 
		    		repository.save(newUser);
		    	}
		    	else {
	    			bindingResult.rejectValue("username", "err.username", "Username has already existed");    	
	    			return "signup";		    		
		    	}
    		}
    		else {
    			bindingResult.rejectValue("passwordCheck", "err.passCheck", "Password does not match");    	
    			return "signup";
    		}
    	}
    	else {
    		return "signup";
    	}
    	return "redirect:/login";    	
    }    
    
}
