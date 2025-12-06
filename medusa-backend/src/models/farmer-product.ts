import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, Product } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";
import { Farmer } from "./farmer";

@Entity()
export class FarmerProduct extends BaseEntity {
  @Index()
  @Column({ type: "varchar" })
  farmer_id: string;

  @ManyToOne(() => Farmer)
  @JoinColumn({ name: "farmer_id" })
  farmer: Farmer;

  @Index()
  @Column({ type: "varchar" })
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column({ type: "decimal", precision: 12, scale: 2, nullable: true })
  farmer_price: number | null;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "fp");
  }
}
