package uasz.etudiant.ms_etudiant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MsEtudiantApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsEtudiantApplication.class, args);
	}

}
