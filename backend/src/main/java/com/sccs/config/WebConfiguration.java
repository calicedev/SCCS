package com.sccs.config;

import com.sccs.api.member.service.JWTService;
import com.sccs.interceptor.JwtInterceptor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableWebMvc
@EnableSwagger2
@RequiredArgsConstructor
public class WebConfiguration implements WebMvcConfigurer {

  public static final Logger logger = LoggerFactory.getLogger(WebConfiguration.class);
  private final JWTService jwtService;
  private final JwtInterceptor jwtInterceptor;
  private final String[] INTERCEPTOR_BLACK_LIST = { // 인터셉터 적용 리스트
      /*
      현재 적용 목록
      회원정보 수정     (PATCH)  "/api/member"
      회원정보 조회     (GET)   "/api/member/{id}"
      비밀번호 수정     (PATCH) "/api/member/password"
       */
//            "/api/member",
//            "/api/member/**",
  };
  private final String[] INTERCEPTOR_WHITE_LIST = { // 인터셉터 미적용 리스트
      "/api/member/login",        // 로그인
      "/api/member/id",           // 아이디 찾기
      "/api/member/refreshToken"  // accesstoken 재발급
  };

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
//                .allowedOrigins("*")
//        .allowedOriginPatterns("*")
//                .allowedHeaders("*")
        .allowedOrigins("http://localhost:8080", "http://localhost:3000", "https://sccs.kr",
            "http://sccs.kr", "http://sccs.kr:8201")
//                .allowedMethods(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.PUT.name(),
//                        HttpMethod.DELETE.name(), HttpMethod.HEAD.name(), HttpMethod.OPTIONS.name(),
//                        HttpMethod.PATCH.name())
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD")
        .allowCredentials(true)
        .maxAge(1800);
  }

  @Override
  public void addInterceptors(InterceptorRegistry reg) {
    logger.debug("인터셉터 적용 !!!!!!!!!!!!!!!!");
    //reg.addInterceptor(jwtInterceptor)
    //.order(1);
//                .addPathPatterns("/**") // 모든 경우 인증작업 적용
//                .addPathPatterns(INTERCEPTOR_BLACK_LIST); // 인터셉터 적용 리스트
//                .excludePathPatterns(INTERCEPTOR_WHITE_LIST); // 인터셉터 제외 리스트
  }


  //	Swagger2 일경우
  @Bean
  public Docket restAPI() {
    return new Docket(DocumentationType.SWAGGER_2)
        .useDefaultResponseMessages(false)
        .apiInfo(apiInfo())
        .select()
        .apis(RequestHandlerSelectors.basePackage("com.sccs"))
        .paths(PathSelectors.any())
        .build();
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
    registry.addResourceHandler("swagger-ui.html")
        .addResourceLocations("classpath:/META-INF/resources/");
    registry.addResourceHandler("/webjars/**")
        .addResourceLocations("classpath:/META-INF/resources/webjars/");
  }

  private ApiInfo apiInfo() {
    return new ApiInfoBuilder()
        .title("SCCS Spring Boot REST API")
        .version("1.0")
        .description("실전 코테 체험 스터디 플랫폼")
        .build();
  }

  @Bean
  public UiConfiguration uiConfig() {
    return UiConfigurationBuilder.builder()
        .displayRequestDuration(true)
        .validatorUrl("")
        .build();
  }

}
