package com.scss.config;

import com.scss.api.member.service.JWTService;
import com.scss.interceptor.JwtInterceptor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpRequest;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@RequiredArgsConstructor
public class WebConfiguration implements WebMvcConfigurer {

    public static final Logger logger = LoggerFactory.getLogger(WebConfiguration.class);
    private final JWTService jwtService;
    private final JwtInterceptor jwtInterceptor;
    private String[] INTERCEPTOR_BLACK_LIST = {
            "/api/member/password",
            "/api/member" // 회원가입(POST), 회원정보 수정, 회원탈퇴
    };
    private String[] INTERCEPTOR_WHITE_LIST = {
            "/api/unique/**", // 중복 검사
            "/api/member", // 회원가입,         회원정보 수정, 회원탈퇴
            "/api/member/login", // 로그인
            "/api/member/id", // 아이디 찾기
            "/api/member/accesstoken" // accesstoken 재발급
    };

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                //.allowedOrigins("*")
                .allowedOriginPatterns("*")
//                .allowedHeaders("*")
//		.allowedOrigins("http://localhost:8080", "http://localhost:3000")
//                .allowedMethods(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.PUT.name(),
//                        HttpMethod.DELETE.name(), HttpMethod.HEAD.name(), HttpMethod.OPTIONS.name(),
//                        HttpMethod.PATCH.name())
			.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD")
                .allowCredentials(true)
                .maxAge(1800);

    }

    @Override
    public void addInterceptors(InterceptorRegistry reg){
        logger.debug("인터셉터 적용 !!!!!!!!!!!!!!!!");
        reg.addInterceptor(jwtInterceptor)
                .order(1)
//                .addPathPatterns("/**") // 모든 경우 인증작업 적용
                .addPathPatterns(INTERCEPTOR_BLACK_LIST);
//                .excludePathPatterns(INTERCEPTOR_WHITE_LIST);
    }


    //	Swagger UI 실행시 404처리
//	Swagger2 일경우
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
//        registry.addResourceHandler("/swagger-ui.html**").addResourceLocations("classpath:/META-INF/resources/swagger-ui.html");
//        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
//    }

}
