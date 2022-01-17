<?php
    include_once "connect.php";

    class ShowAll extends Dtbshst {

        public function show() {

            $result = $this->connect()->query("SELECT * FROM `product_list` ");
            $count = $this->connect()->query("SELECT count(*) FROM `product_list` ");
            $num_rows = mysqli_fetch_row($count)[0];

            for ($i = 0; $i < $num_rows; $i++) {
                $object = $result->fetch_assoc();
                $typeTable = strtolower($object['type']);
                $sku = $object['sku'];

                $doubleInfo = $this->connect()->query("SELECT * FROM `product_list` JOIN `$typeTable` ON `product_list`.`sku`=`$typeTable`.`sku` AND `$typeTable`.`sku` = '$sku'");

                $res = $doubleInfo->fetch_assoc();
                print_r(json_encode($res));
                echo ', ';
            }
            $this->connect()->close();
        }
    }
    $show = new ShowAll;
    $show->show();
?>
