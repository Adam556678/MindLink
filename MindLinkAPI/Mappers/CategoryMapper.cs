using MindLinkAPI.Entities;
using MindLinkAPI.Models;

namespace MindLinkAPI.Mappers
{
    public static class CategoryMapper
    {
        public static CategoryResponseDto ToCategoryRespDto(this Category category)
        {
            return new CategoryResponseDto
            {
                Id = category.Id,
                Name = category.Name,
            };
        }
    }
}