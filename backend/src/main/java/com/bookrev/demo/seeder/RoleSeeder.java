package com.bookrev.demo.seeder;

import com.bookrev.demo.model.Role;
import com.bookrev.demo.model.RoleName;
import com.bookrev.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class RoleSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleSeeder(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public void run(String... args) throws Exception {
        for(RoleName roleName : RoleName.values()){
            if(roleRepository.findByRoleName(roleName).isEmpty()){
                roleRepository.save(new Role(roleName));
                System.out.println("Role: " + roleName + " added successfully.");
            }
            else{
                System.out.println("Role: " + roleName + " already exists.");
            }
        }
    }
}
