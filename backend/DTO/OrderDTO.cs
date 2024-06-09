namespace backend.DTO;

public class OrderDTO
{
    public int OrderId { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal OrderTotalAmount { get; set; }
    public string OrderStatus { get; set; }
    public string UserId { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public string ProductDescription { get; set; }
}