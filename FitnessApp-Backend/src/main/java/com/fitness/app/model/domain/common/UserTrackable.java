package com.fitness.app.model.domain.common;

import java.io.Serializable;
import java.util.Date;

public interface UserTrackable extends Serializable {

    Date getCreatedDate();

    void setCreatedDate(Date createdDate);

    Integer getCreatedBy();

    void setCreatedBy(Integer createdBy);

    Date getModifiedDate();

    void setModifiedDate(Date modifiedDate);

    Integer getModifiedBy();

    void setModifiedBy(Integer createdBy);
}
