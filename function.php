<?php
//check empty fields
function emptyfields($fullname, $student_reg, $password, $cpassword= null, $mode='Register'){
    $result= "";
    if ($mode=='Register') {
      if (empty($fullname) || empty($student_reg) || empty($password) || empty($cpassword)) {
        return $result= true;
      }
      else {
        return $result= false;
      }

    }else {
        if ($mode=='login'){
            if (empty($student_reg)|| empty($password)){
                return $result=true;
            }else{
                return $result=false;
            }
        }
    }
              return $result;
}


//check user id



function checkuid($conec, $student_reg){
    $check="";
    $sql="SELECT * FROM students WHERE student_reg=:student_reg ";
    $query= $conec -> prepare($sql);
    $query->execute([':student_reg'=>$student_reg]);
    $check=$query->fetch(PDO::FETCH_ASSOC);
    $count=$query->rowCount();
    if ($count > 0){
        return $check= true;
    }else {
        return $check = false;
    }
}



//password match
function passwordmatch($password, $cpassword){
    $result="";
    if ($password!= $cpassword) {
        return $result = true;
    }
    else {
        return $result = false;
    }
}





//add user to database
function createuser($conec, $fullname, $student_reg, $institution, $period_of_attachment, $logbook_no, $password){
    $result ="";
    $sql="INSERT INTO students ( fullname, student_reg, institution, period_of_attachment, logbook_no, password) VALUES (:fullname,:student_reg, :institution, :period_of_attachment,:logbook_no, :password)";
    $query= $conec -> prepare($sql);
    $query->execute([':fullname'=>$fullname,':student_reg'=>$student_reg, ':institution'=>$institution, ':period_of_attachment'=>$period_of_attachment,'logbook_no'=>$logbook_no, ':password'=>$password]);

    if ($query) {
        return $result= true;
    }
    else {
        return $result= false;
    }





}


// log user
function logstudent($conec,  $student_reg,  $password){
    $result ="";
    $sql = "SELECT * FROM students WHERE student_reg = :student_reg AND  password = :password";
    $query = $conec->prepare($sql);
    $query->execute([':student_reg'=>$student_reg, ':password'=>$password ]);
    $result = $query->fetch(PDO::FETCH_ASSOC);
    $count = $query->rowCount();
    if ($count > 0) {
        return $result = $result['student_reg'];
    }else {
        return $result = False;
    }
}
function log_c_staff($conec, $institution, $code){
    $result ="";
    $sql = "SELECT * FROM company_supervisors WHERE institution = :institution AND code = :code";
    $query = $conec->prepare($sql);
    $query->execute([':institution'=>$institution, ':code'=>$code ]);
    $result = $query->fetch(PDO::FETCH_ASSOC);
    $count = $query->rowCount();
    if ($count > 0) {
        return $result = $result['code'];
    }else {
        return $result = False;
    }
}
function log_u_staff($conec, $university, $department, $code){
    $result ="";
    $sql = "SELECT * FROM university_supervisor WHERE university = :university AND department = :department AND code = :code ";
    $query = $conec->prepare($sql);
    $query->execute([':university'=>$university,':department'=>$department, ':code'=>$code ]);
    $result = $query->fetch(PDO::FETCH_ASSOC);
    $count = $query->rowCount();
    if ($count > 0) {
        return $result = $result['code'];
    }else {
        return $result = False;
    }
}


function addlog($conec,$month_of_log, $week_of_log, $student_reg, $monday, $tuesday, $wednesday, $thursday, $friday, $mondaydate, $tuesdaydate, $wednesdaydate, $thursdaydate, $fridaydate, $logbook_no){
    $result ="";
    $sql="INSERT INTO logs ( month_of_log, week_of_log, student_reg, monday, tuesday, wednesday, thursday, friday, mondaydate, tuesdaydate, wednesdaydate, thursdaydate, fridaydate, logbook_no) VALUES ( :month_of_log, :week_of_log, :student_reg, :monday, :tuesday, :wednesday, :thursday, :friday, :mondaydate, :tuesdaydate, :wednesdaydate, :thursdaydate, :fridaydate, :logbook_no)";
    $query= $conec -> prepare($sql);
    $query->execute([':month_of_log'=>$month_of_log, ':week_of_log'=>$week_of_log, ':student_reg'=>$student_reg, ':monday'=>$monday, ':tuesday'=>$tuesday, ':wednesday'=>$wednesday, ':thursday'=>$thursday, ':friday'=>$friday, ':mondaydate'=>$mondaydate, ':tuesdaydate'=>$tuesdaydate, ':wednesdaydate'=>$wednesdaydate, ':thursdaydate'=>$thursdaydate, ':fridaydate'=>$fridaydate, 'logbook_no'=>$logbook_no]);

    if ($query) {
        return $result= true;
    }
    else {
        return $result= false;
        }}



        function addcomment($conec, $week_of_log, $month_of_log, $logbook_no, $comment_c_sup){
            $result ="";
            $sql="INSERT INTO comment_company_sup ( week_of_log, month_of_log, logbook_no, comment_c_sup) VALUES (:week_of_log, :month_of_log, :logbook_no, :comment_c_sup)";
            $query= $conec -> prepare($sql);
            $query->execute([':week_of_log'=>$week_of_log,':month_of_log'=>$month_of_log, ':logbook_no'=>$logbook_no, ':comment_c_sup'=>$comment_c_sup]);
        
            if ($query) {
                return $result= true;
            }
            else {
                return $result= false;
            }
        
        
        
        
        
        }


function addresultformb($conec,$student_reg,$level,$semester, $course1, $grade1, $score1,$credit1,$course2,$grade2 ,$score2 ,$credit2,$course3,$grade3 ,$score3 ,$credit3,$course4,$grade4 ,$score4 ,$credit4,$course5,$grade5 ,$score5 ,$credit5, $course6,$grade6 ,$score6 ,$credit6, $course7,$grade7 ,$score7 ,$credit7,$course8,$grade8 ,$score8 ,$credit8,$course9,$grade9 ,$score9 ,$credit9, $course10,$grade10 ,$score10 ,$credit10, $gpa){
    $result ="";
    $sql="INSERT INTO formb ( student_reg, level, semester,course1, grade1, score1,credit1,course2,grade2 ,score2 ,credit2,course3,grade3 ,score3 ,credit3,course4,grade4 ,score4 ,credit4,course5,grade5 ,score5 ,credit5,course6,grade6 ,score6 ,credit6,course7,grade7 ,score7 ,credit7,course8,grade8 ,score8 ,credit8,course9,grade9 ,score9 ,credit9,course10,grade10 ,score10 ,credit10, gpa) VALUES (:student_reg, :level, :semester,:course1, :grade1, :score1,:credit1,:course2,:grade2 ,:score2 ,:credit2,:course3,:grade3 ,:score3 ,:credit3,:course4,:grade4 ,:score4 ,:credit4,:course5,:grade5 ,:score5 ,:credit5,:course6,:grade6 ,:score6 ,:credit6,:course7,:grade7 ,:score7 ,:credit7,:course8,:grade8 ,:score8 ,:credit8,:course9,:grade9 ,:score9 ,:credit9,:course10,:grade10 ,:score10 ,:credit10, :gpa)";
    $query= $conec -> prepare($sql);
    $query->execute([':student_reg'=>$student_reg, ':level'=>$level, ':semester'=>$semester, ':course1'=>$course1, ':grade1'=>$grade1, ':score1'=>$score1, ':credit1'=>$credit1, ':course2'=>$course2, ':grade2'=>$grade2, ':score2'=>$score2, ':credit2'=>$credit2, ':course3'=>$course3, ':grade3'=>$grade3, ':score3'=>$score3, ':credit3'=>$credit3, ':course4'=>$course4, ':grade4'=>$grade4, ':score4'=>$score4, ':credit4'=>$credit4, ':course5'=>$course5, ':grade5'=>$grade5, ':score5'=>$score5, ':credit5'=>$credit5, ':course6'=>$course6, ':grade6'=>$grade6, ':score6'=>$score6, ':credit6'=>$credit6, ':course7'=>$course7, ':grade7'=>$grade7, ':score7'=>$score7, ':credit7'=>$credit7, ':course8'=>$course8, ':grade8'=>$grade8, ':score8'=>$score8, ':credit8'=>$credit8, ':course9'=>$course9, ':grade9'=>$grade9, ':score9'=>$score9, ':credit9'=>$credit9, ':course10'=>$course10, ':grade10'=>$grade10, ':score10'=>$score10, ':credit10'=>$credit10, ':gpa'=>$gpa]);

    if ($query) {
        return $result= true;
    }
    else {
        return $result= false;
    }





}


// SQL query to retrieve rows based on user input







