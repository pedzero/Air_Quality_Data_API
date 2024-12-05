USE scadabr_db; -- replace database name

-- indexes
CREATE INDEX idx_timestamp ON parameters (timestamp);
CREATE INDEX idx_room_name_aqi ON parameters (room_id, name, aqi_included);
CREATE INDEX idx_room_name_timestamp ON parameters (room_id, name, timestamp);
CREATE INDEX idx_avg_filter ON parameters (room_id, name, timestamp, aqi_included);

-- delete old parameters
DELIMITER //
CREATE EVENT delete_old_parameters
ON SCHEDULE EVERY 1 DAY STARTS '2024-12-01 00:00:00'
DO
BEGIN
  DECLARE done INT DEFAULT 0;
  REPEAT
    DELETE FROM parameters
    WHERE timestamp < NOW() - INTERVAL 3 DAY
    LIMIT 1000;
    SET done = ROW_COUNT();
  UNTIL done = 0
  END REPEAT;
END;
//
DELIMITER ;

SET GLOBAL event_scheduler = ON;
