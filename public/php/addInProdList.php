<?php

    include_once "connect.php";

    class AddInProdList extends Dtbshst {
        public function add()
        {
            include_once "connect.php";

            $data = json_decode(file_get_contents('php://input'), true); // To get data from fetch

            foreach ($data as $value) {
                $value=strip_tags(trim($value, ' '));
                if (strlen($value) == 0) {
                    echo 'ERROR';
                    exit();
                }
            }

            $sku = $data["sku"];
            $name = $data["name"];
            $price = $data["price"];
            $type = $data["type"];

            $typeTable = strtolower($type);




            $attributes = array_slice($data, 4);

            $valArr="'$sku',";
            $keyArr='`sku`,';

            foreach ($attributes as $key=>$item) {
                $valArr.='\''.strip_tags(trim($item), ' ').'\'';
                $valArr.=',';

                $keyArr.='`'.$key.'`';
                $keyArr.=',';
            }

            $valArr=trim($valArr, ',');
            $keyArr=trim($keyArr, ',');



            $this->connect()->query("INSERT INTO `product_list` (`sku`,`name`,`price`,`type`) VALUES ('$sku','$name','$price','$type')");
            $this->connect()->query("INSERT INTO `$typeTable` ($keyArr) VALUES ($valArr)");

            print_r($data);

            $this->connect()->close();
        }

    }

    $result = new AddInProdList();
    $result->add();


?>

