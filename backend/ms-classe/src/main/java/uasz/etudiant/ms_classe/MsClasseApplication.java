package uasz.etudiant.ms_classe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.FeignClient;

@SpringBootApplication
@EnableDiscoveryClient
@FeignClient(name = "ms-etudiant")
public class MsClasseApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsClasseApplication.class, args);
	}

}
