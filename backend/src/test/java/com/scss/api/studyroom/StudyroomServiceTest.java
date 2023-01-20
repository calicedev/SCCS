package com.scss.api.studyroom;

import com.scss.api.studyroom.dto.StudyroomDto;
import com.scss.api.studyroom.service.StudyroomService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class StudyroomServiceTest {

    @Autowired
    StudyroomService studyroomService;

    @Test
    @Transactional
    void createStudyroom(){
        StudyroomDto studyroomDto = new StudyroomDto(1,"싸피탈출", "1234","2023-01-17 17:11:02",null,true,false,"python",true);
        String res = studyroomService.createStudyroom(studyroomDto);
        Assertions.assertThat(res).isEqualTo("success");
    }
}
