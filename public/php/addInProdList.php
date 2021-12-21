<?php
    include_once "connect.php";

    class AddInProdList extends Dtbshst {

        public function add()
        {
            include_once "connect.php";

            $data = json_decode(file_get_contents('php://input'), true); // Чтобы отыскать переданные денные из fetch

            $sku = $data["sku"];
            $name = $data["name"];
            $price = $data["price"];
            $type = $data["type"];
            $size = $data["size"];
            $height = $data["height"];
            $length = $data["length"];
            $width = $data["width"];
            $weight = $data["weight"];
            $typeTable = strtolower($data["type"]);


            print_r($data["attrArr"]);


           $this->connect()->query("INSERT INTO `product_list` (`sku`, `name`, `price`, `type`) VALUES ('$sku', '$name', '$price', '$type')");



            $this->connect()->query("INSERT INTO `$typeTable` (`sku`, `size`) VALUES ('$sku', '$size')");
            $this->connect()->query("INSERT INTO `$typeTable` (`sku`, `height`, `width`, `length`) VALUES ('$sku', '$height', '$width', '$length')");
            $this->connect()->query("INSERT INTO `$typeTable` (`sku`, `weight`) VALUES ('$sku', '$weight')");

            $this->connect()->close();
        }

    }

    $result = new AddInProdList();
    $result->add();

?>

