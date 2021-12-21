<?php

    include_once "connect.php";

    class DeleteAll extends Dtbshst {

        public function delete() {
            $data = json_decode(file_get_contents('php://input'), true); // Чтобы отыскать переданные денные из fetch
            $sku = $data["sku"];
            print_r($data);
            if (!$this->connect()->query("DELETE FROM product_list WHERE `sku`='$sku'"))
            {
                echo 'didnt delete in main table';
                exit();
            }
            $typeTable = strtolower($data["type"]);
            if (!$this->connect()->query("DELETE FROM $typeTable WHERE `sku`='$sku'")) {
                echo 'didnt delete in type table';
                exit();
            }
            echo 'nice';
            $this->connect()->close();
        }
    }

    $result = new DeleteAll();
    $result->delete();



?>