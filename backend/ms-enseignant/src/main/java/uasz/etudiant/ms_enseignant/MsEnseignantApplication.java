package uasz.etudiant.ms_enseignant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication
@EnableDiscoveryClient
public class MsEnseignantApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsEnseignantApplication.class, args);
	}

}
