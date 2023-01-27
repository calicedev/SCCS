package com.scss.api.studyroom.dto;

import java.sql.Timestamp;
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
    Timestamp createDateTime;
    Timestamp destroyDatetime;
    Boolean isActive;
    Boolean type;
    List<Integer> languageIds;
    List<Integer> algoIds;
    List<Integer> memberIds;
    Boolean isPrivate;
    int languageId;
    int algoId;
    String memberId;
}
