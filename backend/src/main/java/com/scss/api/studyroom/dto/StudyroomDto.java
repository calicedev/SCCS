package com.scss.api.studyroom.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudyroomDto {
    int id;
    String title;
    String password;
    String create_dateTime;
    String destroy_datetime;
    Boolean is_active;
    Boolean type;
    List<String> language_type;
    Boolean is_private;
}
